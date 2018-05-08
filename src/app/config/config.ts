import swal, { SweetAlertType } from 'sweetalert2';

export const URL_SERVICIOS = 'http://localhost:3000/';
export const IS_BOUTIQUE: boolean = true;

const tipo: SweetAlertType = 'success';

// dialog's
export const ICON_MSJ_TIMER = './assets/img/timer.gif';
export const ICON_MSJ_CHECK = './assets/img/check.gif';
export const DIALOG_LOADING = {
    showConfirmButton: false,
    allowOutsideClick: false,
    imageUrl: ICON_MSJ_TIMER,
    width: '22rem' }; // closeOnEsc: false

export const DIALOG_LOADING_MIN_TIMER = {
    showConfirmButton: false,
    allowOutsideClick: false,
    imageUrl: ICON_MSJ_TIMER,
    timer: 1800,
    width: '22rem' }; // closeOnEsc: false

export const DIALOG_LOADING_SUCCESS = {
    type: tipo,
    text: 'Proceso completado.',
    showConfirmButton: false,
    timer: 1500, width: '22rem'
}; // closeOnEsc: false

