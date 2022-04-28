import {Component, OnInit} from '@angular/core';
import {ChangePasswordDTO} from '../models/change-password-dto';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {EmailPasswordService} from '../service/email-password.service';

@Component({
  selector: 'app-change-password-from-login',
  templateUrl: './change-password-from-login.component.html',
  styleUrls: ['./change-password-from-login.component.css']
})
export class ChangePasswordFromLoginComponent implements OnInit {
  password: string;
  confirmPassword: string;
  tokenPassword: string;

  chahgePassword: ChangePasswordDTO;

  constructor(private toastrService: ToastrService, private router: Router, private activatedRoute: ActivatedRoute, private passwordService: EmailPasswordService) {
  }

  ngOnInit() {
  }

  onChangePassword(): void {
    if(this.password !== this.confirmPassword){
      this.toastrService.error('Las contraseñas no coinciden', 'FAIL', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }
    this.tokenPassword = this.activatedRoute.snapshot.params.tokenPassword;
    this.chahgePassword = new ChangePasswordDTO(this.password, this.confirmPassword, this.tokenPassword);
    this.passwordService.changePassword(this.chahgePassword).subscribe(
      data => {
        this.toastrService.success(data.mensaje, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastrService.error(err.error.mensaje, 'FAIL', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

}
