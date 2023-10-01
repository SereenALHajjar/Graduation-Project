import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

//cross field validation
//if validation has not parameters
export const passwordMatch: ValidatorFn= 
     (frmGroup: AbstractControl): ValidationErrors | null => {
        let passControll = frmGroup.get('password');
        let ConfirmpassControll = frmGroup.get('confirmpassword');
       if (!passControll || !ConfirmpassControll || !passControll.value || !ConfirmpassControll.value)
            return null;
        
        let valErr={'UnmatchedPassword':{'pass':passControll?.value,'confirmpass':ConfirmpassControll?.value}}
        return(passControll?.value==ConfirmpassControll?.value)? null:valErr;
             

    }
//if validation has parameters use factory fun

