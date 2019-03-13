import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') private isOpen = false;

    @HostListener('click') onClick() {
        this.isOpen = !this.isOpen;
    }
}
