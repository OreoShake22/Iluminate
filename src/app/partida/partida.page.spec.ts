import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PartidaPage } from './partida.page';

describe('PartidaPage', () => {
  let component: PartidaPage;
  let fixture: ComponentFixture<PartidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartidaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PartidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
