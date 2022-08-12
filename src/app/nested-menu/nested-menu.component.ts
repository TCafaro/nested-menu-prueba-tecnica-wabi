import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from './nested-menu.interfaces';

@Component({
  selector: 'app-nested-menu',
  templateUrl: './nested-menu.component.html',
  styleUrls: ['./nested-menu.component.scss'],
})
export class NestedMenuComponent {
  @Input()
  menuItems: MenuItem[] = [];

  @Input()
  closingTimeout: number = 0;

  @Output()
  itemClicked: EventEmitter<number> = new EventEmitter<number>();

  public closing: ReturnType<typeof setTimeout> | undefined;
  public menuIsOpen: boolean = false;

  public closeMenu(): void {
    this.closing = setTimeout(
      () => (this.menuIsOpen = false),
      this.closingTimeout
    );
  }

  public contractItem(item: MenuItem): void {
    item.closing = setTimeout(
      () => (item.expanded = false),
      this.closingTimeout
    );
  }

  public expandItem(item: MenuItem): void {
    item.expanded = true;
    clearTimeout(item.closing);
  }

  public triggerMenu(): void {
    this.menuIsOpen = !this.menuIsOpen;
    this.clearClosingTimeout();
  }

  public clearClosingTimeout(): void {
    clearTimeout(this.closing);
  }

  public onItemClick(item: MenuItem): void {
    this.itemClicked.emit(item.id);
  }

  public triggerItem(item: MenuItem): void {
    item.expanded = !item.expanded;
    clearTimeout(item.closing);
  }
}
