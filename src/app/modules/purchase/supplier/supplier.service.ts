import { SupplierService } from "./../../../@data-service/supplier.service";
import { Supplier } from "./../../../@models/supplier";
import { Injectable } from "@angular/core";
import {
  DefaultDataService,
  DefaultDataServiceConfig,
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
  HttpUrlGenerator,
} from "@ngrx/data";
import { HttpClient } from "@angular/common/http";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { tap, filter, first } from "rxjs/operators";

@Injectable()
export class SupplierEntityService extends EntityCollectionServiceBase<
  Supplier
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("Supplier", serviceElementsFactory);
  }
}

@Injectable()
export class SupplierDataService extends DefaultDataService<Supplier> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    supplierService: SupplierService
  ) {
    super("Supplier", http, httpUrlGenerator);
  }
  // entityUrl = environment.apiRoot + "/supplier/";
  // entitiesUrl = environment.apiRoot + "/supplier";

  // getAll() {
  //   return this.supplierService.get().subscribe((data) => {
  //     return data.map((e: any) => {
  //       return {
  //         id: e.payload.doc.id,
  //         ...e.payload.doc.data(),
  //       } as Supplier;
  //     });
  //   });
  // }
}

@Injectable()
export class SupplierResolver implements Resolve<boolean> {
  constructor(private supplierService: SupplierEntityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.supplierService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.supplierService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
