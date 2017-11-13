import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AsdPingStatus, AsdUrlPingItem} from '../AsdTypes';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PingService} from '../ping.service';
import {ConfigurationService} from '../configuration.service';

@Component({
  selector: 'asd-add-edit-url-form',
  templateUrl: './add-edit-url-form.component.html',
  styleUrls: ['./add-edit-url-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditURLFormComponent implements OnChanges {
  closeResult: string;

  @Input() pingItem: AsdUrlPingItem = null;
  pingForm: FormGroup;
  private modalRef: any;

  constructor(private modalService: NgbModal,
              private fb: FormBuilder,
              private configurationService: ConfigurationService) {
    this.createForm();
  }

  ngOnChanges() {
    this.pingForm.reset({
      title: this.pingItem.title,
      description: this.pingItem.description,
      url: this.pingItem.url,
    });
  }

  createForm() {
    this.pingForm = this.fb.group({
      title: '',
      description: '',
      url: ''
    });
  }

  onSubmit() {

    const isAddOperation = this.pingItem == null;

    this.pingItem = this.prepareSavePingItem();

    if (isAddOperation) {
      this.configurationService.addNewPingItem(this.pingItem);
    } else {
      this.configurationService.editPingItem(this.pingItem);
    }

    this.ngOnChanges();
    this.pingForm.reset();

    if (isAddOperation) {
      this.pingItem = null;
    }

    this.modalRef.close();
  }

  prepareSavePingItem(): AsdUrlPingItem {
    const formModel = this.pingForm.value;

    const saveItem: AsdUrlPingItem = {
      title: formModel.title as string,
      description: formModel.description as string,
      url: formModel.url as string,
      isFavorite: false,
      currentStatus: this.pingItem === null ? AsdPingStatus.pending : this.pingItem.currentStatus
    };
    return saveItem;
  }

  open(content) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
