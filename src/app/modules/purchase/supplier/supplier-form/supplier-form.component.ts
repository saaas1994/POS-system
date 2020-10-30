import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApicallService } from 'app/@data-service/apicall.service';
import { SupplierService } from 'app/@data-service/supplier.service';
import { Supplier } from 'app/@models/supplier';
import { gsap } from "gsap";
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/operators';
// import { SplitText } from 'gsap/SplitText';



@Component({
  selector: 'ngx-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApicallService
  ) { }

  submitted: boolean = false;
  supplierForm: FormGroup;
  supplier: Supplier;
  id: string;
  categories: string[];

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    if (this.id) {
      this.apiService.getUsers(this.id).subscribe((res:any) => {
        console.log("Get User",res);  
        this.supplier = res;
        this.supplierForm = this.formBuilder.group({
          name: [this.supplier.name, Validators.required],
          email: [this.supplier.email, Validators.required],
        })
        this.supplierForm.get('name').setValue(res.data.first_name)
        this.supplierForm.get('email').setValue(res.data.email)
      });
      // this.supplierService.find(this.id).then((supplier: Supplier) => {
      //   this.supplier = supplier;
      //   this.supplierForm = this.formBuilder.group({
      //     name: [this.supplier.name, Validators.required],
      //     address: [this.supplier.address, Validators.required],
      //     postCode: [this.supplier.postCode, Validators.required],
      //     state: [this.supplier.state, Validators.required],
      //     country: [this.supplier.country, Validators.required],
      //     phone: [this.supplier.phone, Validators.required],
      //     email: [this.supplier.email, Validators.required, Validators.email],
      //     contactPerson: [this.supplier.contactPerson],
      //     city: [this.supplier.city],
      //     gst: [this.supplier.gst],
      //     taxNumber: [this.supplier.taxNumber],
      //     mobile: [this.supplier.mobile],
      //     openingBalance: [this.supplier.openingBalance],
      //   })
      // })
    } else {
      this.supplierForm = this.formBuilder.group({
        name: ["", Validators.required],
        email: ["", Validators.required],
        // address: ["", Validators.required],
        // postCode: ["", Validators.required],
        // state: ["", Validators.required],
        // country: ["", Validators.required],
        // phone: ["", Validators.required],
        // email: ["", Validators.required, Validators.email],
        // contactPerson: [""],
        // city: [""],
        // gst: [""],
        // taxNumber: [""],
        // mobile: [""],
        // openingBalance: [""],
      })
    }
  }


  createUsers() {
    const supplier = this.supplierForm.value;

    this.apiService.createUsers(supplier).subscribe((res) => {
    });
  }

  submit() {
    this.submitted = true;
    const supplier = this.supplierForm.value;

    console.log("Form Values", this.supplierForm.value);

    if (this.supplierForm.valid) {

      if (this.id) {
        this.apiService.updateUsers(supplier,this.id).subscribe((res) => {
          console.log(res);
          this.router.navigate(["/pages/supplier"]);
        });

      }
      else {
        const supplier = this.supplierForm.value;

        this.apiService.createUsers(supplier).subscribe((res) => {
          console.log(res);
          this.router.navigate(["/pages/supplier"]);
        });
      }
    }

    // if (this.supplierForm.valid) {

    //   if (this.id) {
    //     const supplier: Supplier = this.supplierForm.value;
    //     // this.supplierForm.get("areaIds").value.forEach((area) => {
    //     //   supplier.areaIds.push(area);
    //     // });

    //     supplier.id = this.id;
    //     this.supplierService.update(supplier).then((res) => {
    //       this.router.navigate(["/pages/supplier"]);
    //     })
    //   } else {
    //     this.supplierService.create(this.supplierForm.value).then((res) => {
    //     });
    //     // this.router.navigate(["/pages/supplier"]);

    //   }
    // } else {
    //   console.log("Not valid");
    // }
  }

  // convenience getter for easy access to form fields
  get f() { return this.supplierForm.controls; }

  isFieldValid(field: string) {
    return (
      !this.supplierForm.get(field).valid && this.supplierForm.get(field).touched
    );
  }

  test() {
    var $quote = ("#quote");
    var mySplitText = new SplitText($quote, { type: "words" });
    var splitTextTimeline = gsap.timeline()

    gsap.set($quote, { perspective: 400 });
  }

  apply() {

  }
}
