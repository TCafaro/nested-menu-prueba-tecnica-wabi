import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RawMenuItem } from './app.interfaces';
import { MenuItem } from './nested-menu/nested-menu.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public menuItems: MenuItem[] = [];

  constructor(private _http: HttpClient) {
    this._loadMenuItems().subscribe();
  }

  public logItemClicked(id: number) {
    console.log('Se ha pulsado el elemento con id: ', id);
  }

  private _loadMenuItems(): Observable<RawMenuItem[]> {
    return this._http.get<RawMenuItem[]>('assets/menu-data.json').pipe(
      tap((rawMenuItems: RawMenuItem[]) => {
        this.menuItems = this._buildMenuItems(rawMenuItems);
      })
    );
  }

  private _buildMenuItems(
    rawMenuItems: RawMenuItem[],
    parentId: number | undefined = undefined
  ): MenuItem[] {
    return rawMenuItems.reduce((acc: MenuItem[], current: RawMenuItem) => {
      if (current.parentId == parentId) {
        const item: MenuItem = { ...current, children: [] };
        const children = this._buildMenuItems(rawMenuItems, current.id);
        if (children.length) item.children = children;
        acc.push(item);
      }
      return acc;
    }, []);
  }
}
