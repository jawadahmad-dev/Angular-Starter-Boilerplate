import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Shared } from '../../Core/Services/shared';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Rest } from '../../Core/Services/rest';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private restService = inject(Rest);
  protected sharedService = inject(Shared);

  signInForm!: FormGroup;
  protected isSubmitting = false;

  get emailControl(): AbstractControl | null {
    return this.signInForm?.get('email') ?? null;
  }

  get passwordControl(): AbstractControl | null {
    return this.signInForm?.get('password') ?? null;
  }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.signInForm.markAllAsTouched();

    if (this.signInForm.invalid) {
      this.sharedService.toaster('error', 'Error', 'Please enter both your email and password.');
      return;
    }

    this.isSubmitting = true;
    const userData = {
      Email: this.signInForm.value.email,
      Password: this.signInForm.value.password,
    };

    //   this.restService.Signin(userData).subscribe({
    //     next: (response) => {
    //       this.isSubmitting = false;

    //       if (response.Code === 200) {
    //         localStorage.removeItem('token');
    //         localStorage.setItem('token', response.Data);
    //         this.sharedService.cookieService.set('token', response.Data, 2, '/');
    //         this.sharedService.toaster('success', 'Signin successful', 'Welcome back');
    //         this.signInForm.reset();

    //         if (this.sharedService.Claims()?.role === 'SuperAdmin') {
    //           this.router.navigateByUrl('/superadmin');
    //         }
    //         if (this.sharedService.Claims()?.role === 'Admin') {
    //           this.router.navigateByUrl('/admin');
    //         }
    //       } else {
    //         this.sharedService.toaster(
    //           'error',
    //           'Signin failed',
    //           response.Message || 'An error occurred during signin',
    //         );
    //       }
    //     },
    //     error: (err) => {
    //       this.isSubmitting = false;

    //       if (err.status === 0) {
    //         this.sharedService.toaster(
    //           'error',
    //           'Signin failed',
    //           'Unable to connect to the server. Please check your internet connection and try again.',
    //         );
    //       } else if (err.error.message === 'User with this email not exists') {
    //         this.sharedService.toaster('error', 'Signin failed', 'User with this email not exists.');
    //       } else if (err.error.message === 'Incorrect password') {
    //         this.sharedService.toaster('error', 'Signin failed', 'Incorrect password.');
    //       } else {
    //         this.sharedService.toaster(
    //           'error',
    //           'Signin failed',
    //           err.message || 'An error occurred during signin',
    //         );
    //       }
    //     },
    //   });
    // }
  }
}
