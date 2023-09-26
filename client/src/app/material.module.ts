import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
    exports: [
        MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, MatTabsModule, MatButtonModule, MatDividerModule, MatDialogModule,
        MatInputModule, MatCheckboxModule, MatSelectModule
    ],
})
export class MaterialModule { }