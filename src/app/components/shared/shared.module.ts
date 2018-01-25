import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { PanelLateralComponent } from './panel-lateral.component';
import { NavbarComponent } from './navbar.component';


@NgModule({
    declarations: [
        PanelLateralComponent,
        NavbarComponent
    ],
    exports: [
        PanelLateralComponent,
        NavbarComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})

export class SharedModule { }