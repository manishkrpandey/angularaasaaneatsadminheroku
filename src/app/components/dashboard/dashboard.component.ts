import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable }   from 'rxjs';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardService } from 'src/app/services/dasboard/dashboard.service';
import { AuthTokenService } from 'src/app/services/authtoken.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userDetailsObj = [];
  addNewUserRequestObject = {
    command: 'insert',
    remember_token: 'new_token',
    mobile_number: '981103',
    employee_type_id: '1',
    employee_name: 'jamwant yadav',
    email_id: 'jamwant@gmail.com'
};
authToken: any = '';
getAllUserDetailsRequestObject =  {
  command: 'retrieve',
  remember_token: this.authToken ? this.authToken : '',
};


  constructor(
    private formBuilder: FormBuilder,
    conRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private dashboardService: DashboardService,
    private tokenService: AuthTokenService
    ) {
      this.authToken = this.tokenService.getToken();
      this.getAllUserDetailsRequestObject.remember_token = this.addNewUserRequestObject.remember_token = this.authToken;

     }
  formGroup: FormGroup;
  selected = 'option2';
  userFilter: any = { employee_name: '' };
  userLabel = [
    {label: 'Name', icon: 'face', key: 'employee_name'},
   {label: 'Contact Number', icon: 'contact_phone', key: 'mobile_number'},
   {label: 'Area', icon: 'house', key: ''},
   {label: 'Email Add', icon: 'email', key: 'email_id'},
   {label: 'Team', icon: 'supervised_user_circle', key: ''}];
  usersList = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      isVerified: true,
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496'
        }
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
      }
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      isVerified: false,
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
        geo: {
          lat: '-43.9509',
          lng: '-34.4618'
        }
      },
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      company: {
        name: 'Deckow-Crist',
        catchPhrase: 'Proactive didactic contingency',
        bs: 'synergize scalable supply-chains'
      }
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
      isVerified: true,
      address: {
        street: 'Douglas Extension',
        suite: 'Suite 847',
        city: 'McKenziehaven',
        zipcode: '59590-4157',
        geo: {
          lat: '-68.6102',
          lng: '-47.0653'
        }
      },
      phone: '1-463-123-4447',
      website: 'ramiro.info',
      company: {
        name: 'Romaguera-Jacobson',
        catchPhrase: 'Face to face bifurcated interface',
        bs: 'e-enable strategic applications'
      }
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
      isVerified: false,
      address: {
        street: 'Hoeger Mall',
        suite: 'Apt. 692',
        city: 'South Elvis',
        zipcode: '53919-4257',
        geo: {
          lat: '29.4572',
          lng: '-164.2990'
        }
      },
      phone: '493-170-9623 x156',
      website: 'kale.biz',
      company: {
        name: 'Robel-Corkery',
        catchPhrase: 'Multi-tiered zero tolerance productivity',
        bs: 'transition cutting-edge web services'
      }
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
      isVerified: true,
      address: {
        street: 'Skiles Walks',
        suite: 'Suite 351',
        city: 'Roscoeview',
        zipcode: '33263',
        geo: {
          lat: '-31.8129',
          lng: '62.5342'
        }
      },
      phone: '(254)954-1289',
      website: 'demarco.info',
      company: {
        name: 'Keebler LLC',
        catchPhrase: 'User-centric fault-tolerant solution',
        bs: 'revolutionize end-to-end systems'
      }
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
      isVerified: true,
      address: {
        street: 'Norberto Crossing',
        suite: 'Apt. 950',
        city: 'South Christy',
        zipcode: '23505-1337',
        geo: {
          lat: '-71.4197',
          lng: '71.7478'
        }
      },
      phone: '1-477-935-8478 x6430',
      website: 'ola.org',
      company: {
        name: 'Considine-Lockman',
        catchPhrase: 'Synchronised bottom-line interface',
        bs: 'e-enable innovative applications'
      }
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz',
      isVerified: true,
      address: {
        street: 'Rex Trail',
        suite: 'Suite 280',
        city: 'Howemouth',
        zipcode: '58804-1099',
        geo: {
          lat: '24.8918',
          lng: '21.8984'
        }
      },
      phone: '210.067.6132',
      website: 'elvis.io',
      company: {
        name: 'Johns Group',
        catchPhrase: 'Configurable multimedia task-force',
        bs: 'generate enterprise e-tailers'
      }
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me',
      isVerified: true,
      address: {
        street: 'Ellsworth Summit',
        suite: 'Suite 729',
        city: 'Aliyaview',
        zipcode: '45169',
        geo: {
          lat: '-14.3990',
          lng: '-120.7677'
        }
      },
      phone: '586.493.6943 x140',
      website: 'jacynthe.com',
      company: {
        name: 'Abernathy Group',
        catchPhrase: 'Implemented secondary concept',
        bs: 'e-enable extensible e-tailers'
      }
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io',
      isVerified: true,
      address: {
        street: 'Dayna Park',
        suite: 'Suite 449',
        city: 'Bartholomebury',
        zipcode: '76495-3109',
        geo: {
          lat: '24.6463',
          lng: '-168.8889'
        }
      },
      phone: '(775)976-6794 x41206',
      website: 'conrad.com',
      company: {
        name: 'Yost and Sons',
        catchPhrase: 'Switchable contextually-based project',
        bs: 'aggregate real-time technologies'
      }
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz',
      isVerified: true,
      address: {
        street: 'Kattie Turnpike',
        suite: 'Suite 198',
        city: 'Lebsackbury',
        zipcode: '31428-2261',
        geo: {
          lat: '-38.2386',
          lng: '57.2232'
        }
      },
      phone: '024-648-3804',
      website: 'ambrose.net',
      company: {
        name: 'Hoeger LLC',
        catchPhrase: 'Centralized empowering task-force',
        bs: 'target end-to-end models'
      }
    }
  ];
  step = 0;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      employeeType: ['', Validators.required],
      email: ['', Validators.required]

    });
    this.getAllUserDetails();
  }

  AddNewuser() {
    if (this.formGroup.valid) {
      this.addNewUserRequestObject.email_id = this.formGroup.get('email').value;
      this.addNewUserRequestObject.employee_type_id = this.formGroup.get('employeeType').value;
      this.addNewUserRequestObject.employee_name = this.formGroup.get('userName').value;
      this.addNewUserRequestObject.mobile_number = this.formGroup.get('mobileNumber').value;
      this.dashboardService.addNewUser(this.addNewUserRequestObject).subscribe(data => {
        if (data && data.status ) {
          this.getAllUserDetails();
        }
      });
    }
  }

  getAllUserDetails() {
    this.dashboardService.getAllUserDetails(this.getAllUserDetailsRequestObject).subscribe(data => {
      if (data && data.status) {
        this.userDetailsObj = data.data;
      }
    });
  }

  getColor(status) {
    console.log(status);
  }

  getError(el) {
    switch (el) {
      case 'user':
        if (this.formGroup.get('userName').hasError('required')) {
          return 'Username required';
        }
        break;
      case 'pass':
        if (this.formGroup.get('mobileNumber').hasError('required')) {
          return 'Mobile Number required';
        }
        break;
        case 'email':
          if (this.formGroup.get('email').hasError('required')) {
            return 'Email required';
          }
          break;
      default:
        return '';
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onSubmit(post) {
    // this.post = post;
  }


}
