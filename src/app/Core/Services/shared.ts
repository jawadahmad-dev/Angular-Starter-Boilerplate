import { Injectable, inject } from '@angular/core';
import { ButtonSeverity } from 'primeng/button';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Shared {
  private toastService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  private activeRequests = 0;
  private routeLoading = false;
  private loading = new BehaviorSubject<boolean>(false);
  $obsloading = this.loading.asObservable();

  private updateLoadingState() {
    this.loading.next(this.activeRequests > 0 || this.routeLoading);
  }

  showLoading() {
    this.activeRequests++;
    this.updateLoadingState();
  }

  hideLoading() {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }
    this.updateLoadingState();
  }

  setRouteLoading(isLoading: boolean) {
    this.routeLoading = isLoading;
    this.updateLoadingState();
  }

  toaster(Serverty: string, Summary: string, Details?: string, Icon?: string, Life?: number) {
    this.toastService.add({
      severity: Serverty,
      summary: Summary,
      detail: Details,
      icon: Icon,
      life: Life ?? 1200,
    });
  }

  closeDialogConfirmation(
    header: string,
    msg: string,
    icon: string,
    acceptLabel: string = 'Confirm',
    onAccept: () => void,
    btnSeverity?: ButtonSeverity,
    onReject?: () => void,
  ) {
    this.confirmationService.confirm({
      message: msg,
      header: header,
      icon: icon,
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: acceptLabel,
        severity: btnSeverity ?? 'danger',
      },
      accept: () => onAccept(),
      reject: () => {
        if (onReject) {
          onReject();
        }
      },
    });
  }

  confirmlogOut(): void {
    // Delegates to AuthService so the Frappe session is invalidated server
    // side and the keep-alive heartbeat is stopped.
    localStorage.clear();
  }
  logOut() {
    this.closeDialogConfirmation(
      'لاگ آؤٹ',
      'کیا آپ واقعی لاگ آؤٹ کرنا چاہتے ہیں؟',
      'pi pi-signout',
      'logout',
      () => this.confirmlogOut(),
    );
  }

  goBackOneStep(fallbackUrl: string = '/') {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
      return;
    }

    this.router.navigateByUrl(fallbackUrl);
  }

  BackToHomeRoute() {
    this.router.navigateByUrl('/');
  }
}
