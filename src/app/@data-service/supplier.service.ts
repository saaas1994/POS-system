import { Injectable } from "@angular/core";
import { AngularFirestore, QuerySnapshot } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Supplier } from "../@models/supplier";
import { DataService } from "./data.service";

@Injectable({
  providedIn: "root",
})
export class SupplierService implements DataService {
  collection = "suppliers";
  constructor(private firestore: AngularFirestore) {}
  find(key: string) {
    return this.firestore
      .collection(this.collection)
      .doc(key)
      .get()
      .toPromise()
      .then((res) => {
        return res.data();
      });
  }
  filter(key: string, value: string) {
    throw new Error("Method not implemented.");
  }
  // get() {
  //   return this.firestore
  //     .collection(this.collection)
  //     .get()
  //     .pipe(
  //       map((res: QuerySnapshot<Supplier>) => {
  //         return res.docs.map((d) => {
  //           return { id: d.id, ...d.data() };
  //         });
  //       })
  //     );
  // }
  get() {
    return this.firestore.collection(this.collection).snapshotChanges();
  }

  getCompleted() {
    return this.firestore
      .collection(this.collection, (ref) =>
        ref.where("status", "==", "Complete")
      )
      .snapshotChanges();
  }

  getByCommunity(communityId: string) {
    return this.firestore
      .collection(this.collection, (ref) =>
        ref.where("communityId", "array-contains", communityId)
      )
      .snapshotChanges();
  }
  getByPage(page: number, count: number) {
    return this.firestore
      .collection(this.collection, (ref) =>
        ref
          .orderBy("name")
          .startAt(page * count)
          .limit(count)
      )
      .snapshotChanges();
  }
  create(item: Supplier) {
    return this.firestore.collection(this.collection).add(item);
  }
  update(item: Supplier) {
    const id = item.id;
    delete item.id;
    return this.firestore.doc(this.collection + "/" + id).update({ ...item });
  }
  remove(itemId: string) {
    return this.firestore.doc(this.collection + "/" + itemId).delete();
  }
}
