namespace shalu;
// using {cuid} from '@sap/cds/common';
// using {shalu.common} from './common';

entity businesspartner{
  key  Node_Key : String(32);
    BP_Role:String(20);
    Email_Address:String(125);
    Phone_Number:String(16);
    Fax_Number:String(20);
    BP_ID:String(18);
    Company_Name:String(120);
}

// entity address{
//     key Node_key:String(32);
//     Postal_Code:String(15);
//     Street:String(60);
//     Building:String(67);
//     Country:String(20);
//     }

//   entity employee :cuid{
//       First_Name:String(20);
//       Last_Name:String(20);
//       Sex: common.Gender;
//       Language:String(10);
//       Phone_number:String(10);
//       Email:String(30);
//   }  
