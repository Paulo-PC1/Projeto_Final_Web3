import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

/**
 * Validador para formulários template-driven: o campo só é válido se o valor for
 * igual ao informado em [appMatchValue]. Uso (confirmar senha):
 *
 *   <input ngModel [appMatchValue]="password" #confirm="ngModel">
 *   confirm.hasError('mismatch')
 *
 * Como o erro vive no próprio controle, a mensagem aparece enquanto o usuário digita
 * (não só depois do envio) e o formulário (f.invalid) já fica inválido.
 */
@Directive({
  selector: '[appMatchValue]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchValueDirective, multi: true }]
})
export class MatchValueDirective implements Validator, OnChanges {

  @Input('appMatchValue') other = '';

  private onValidatorChange?: () => void;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // campo vazio é problema do "required", não deste validador
    }
    return control.value === this.other ? null : { mismatch: true };
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  // Se a senha original mudar depois de a confirmação ser digitada, revalida a confirmação.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['other']) {
      this.onValidatorChange?.();
    }
  }
}
