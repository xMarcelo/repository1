import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { PanelLateralComponent } from './panel-lateral.component';
import { NavbarComponent } from './navbar.component';
import { BreadcrumbsComponent } from './breadcrumbs.component';


@NgModule({
    declarations: [
        PanelLateralComponent,
        NavbarComponent,
        BreadcrumbsComponent
    ],
    exports: [
        PanelLateralComponent,
        NavbarComponent,
        BreadcrumbsComponent
    ],
    imports: [
        CommonModule,    
        RouterModule
    ]
})

export class SharedModule { }