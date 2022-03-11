import Realm from "realm";

class Contact extends Realm.Object { }
Contact.schema = {
  name: "Saved",
  properties: {
    id: "int",
    description: "string",
    price: "int",
    orderable_status: "int",
    imagepath: "string",
    user_name:"string",
    deletion_status:"int",
    name:"string",
    user_password:"string",
    country:"string",
    district:"string",
    subdistrict:"string",
    region:"string",
    Location:"string",
    currency:"string",
    cell_number:"string"
  },
  primaryKey: "id",
};

export default new Realm({ schema: [Contact] });