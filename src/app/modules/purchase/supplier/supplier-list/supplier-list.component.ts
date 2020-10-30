import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbMenuService, NbToastrService } from '@nebular/theme';
import { ApicallService } from 'app/@data-service/apicall.service';
import { SupplierService } from 'app/@data-service/supplier.service';
import { Supplier } from 'app/@models/supplier';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {

  suppliers: any[] = [];
  page = 1;
  pageSize = 10;
  supplier: Supplier;
  searchControl: FormControl = new FormControl();
  suppliers$: Observable<any[]>;
  items = [{ title: "Edit" }, { title: "UNBLOCK" }, { title: "BLOCK" }, { title: 'Delete' }];
  index = 1;
  users: any = [];

  constructor(
    private router: Router,
    private dialogService: NbDialogService,
    private supplierService: SupplierService,
    private menu: NbMenuService,
    private toastrService: NbToastrService,
    private http: HttpClient,
    private apiService: ApicallService
  ) { }

  ngOnInit() {
    this.http.get('https://reqres.in/api/users').subscribe(res => {
      this.users = res["data"];
      console.log(res);

    });
  }


  openUploaderDialog() {
    // this.dialogService
    //   .open(SupplierUploadDialogComponent)
    //   .onClose.subscribe((name) => name && this.dialogResult.push(name));
  }


  menus() {
    this.menu.onItemClick().subscribe((data: any) => {

      if (data.item.title === "Edit") {
        this.edit(data.tag.id);
      }
      else if (data.item.title === "UNBLOCK") {
        // this.active(data.tag.supplier)
      }
      else if (data.item.title === "BLOCK") {
        // this.block(data.tag.supplier)
      }
      else if (data.item.title === "Delete") {

        this.apiService.deleteUsers(data.tag.id).subscribe((res) => {
          console.log(res);

          this.showToast('danger', 'User Removed', '')
        });
        // this.supplierService.remove(data.tag.id).then(result => {

        //   this.showToast('danger', 'Supplier Removed', '')
        // })

      }
    });
  }

  edit(id: string) {
    this.router.navigate(["purchase/supplier/supplier-form", id]);
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: true,
    };
    const titleContent = title ? ` ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

}
