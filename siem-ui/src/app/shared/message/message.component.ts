import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  // role="alert": leitores de tela anunciam a mensagem assim que ela aparece.
  template: `
    <div *ngIf="hasError()" class="p-message p-message-error" role="alert">
      {{ text }}
    </div>
  `,
  styles: `
  .p-message-error {
    padding: 3px;
    margin: 0;
    margin-top: 4px;
    color: #c0392b;
    font-size: 0.85rem;
  }
  `
})
export class MessageComponent {
  @Input() error!: string;
  // Aceita tanto um FormControl quanto o NgModel (#campo="ngModel") usado nos templates.
  @Input() control!: AbstractControl | AbstractControlDirective;
  @Input() text!: string;

  // Mostra o erro depois que o usuário digitou OU passou pelo campo (touched). Antes só
  // aparecia com "dirty": quem tabulava por um campo obrigatório vazio não recebia aviso
  // nenhum, e o botão ficava desabilitado sem explicação.
  hasError(): boolean {
    return !!this.control?.hasError(this.error) && !!(this.control.dirty || this.control.touched);
  }

}
