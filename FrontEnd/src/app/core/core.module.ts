import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    AuthService,
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
