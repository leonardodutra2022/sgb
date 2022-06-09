import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { Rubrica } from 'src/app/model/rubrica';
import { Usuario } from 'src/app/model/usuario';
import { RubricaService } from 'src/app/service/rubrica.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { RubricaInfoComponent } from '../rubrica-info/rubrica-info.component';

@Component({
  selector: 'app-rubrica-cropper',
  templateUrl: './rubrica-cropper.component.html',
  styleUrls: ['./rubrica-cropper.component.scss']
})
export class RubricaCropperComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  usuario: Usuario = new Usuario();
  rubricaAtual: Rubrica = new Rubrica();
  rubricaBase64 = '';

  constructor(private rubricaService: RubricaService,  
              private sessaoService: SessaoService,
              public sanitizer: DomSanitizer,
              public dialog : MatDialog) { }

  ngOnInit(): void {
    this.info();
    this.initUsuario();
  }

  initUsuario(){
    this.usuario = this.sessaoService.getUsuarioLogado();
    this.getRubrica();
  }

  getRubrica(){
      this.rubricaService
        .getRubrica(this.usuario.id)
            .subscribe(
                dados => {
                    this.rubricaAtual = dados;
                    if(dados.hasRubrica){
                        this.rubricaBase64 = dados.rubricaBase64String;
                    }
            }
      );
  }

  updateRubrica(){
    let rub = new Rubrica();
    rub.usuarioId = this.usuario.id;
    rub.rubricaBase64String = this.croppedImage;

    this.rubricaService
        .add(rub)
            .subscribe(
                res => {
                    this.rubricaAtual = new Rubrica();
                    this.rubricaAtual = res;
                    this.rubricaBase64 = this.croppedImage;
                    this.rubricaAtual.hasRubrica = true;
                }
        );
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  imageLoaded() {
      this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {
  }

  loadImageFailed() {
  }

  rotateLeft() {
      this.canvasRotation--;
      this.flipAfterRotate();
  }

  rotateRight() {
      this.canvasRotation++;
      this.flipAfterRotate();
  }

  private flipAfterRotate() {
      const flippedH = this.transform.flipH;
      const flippedV = this.transform.flipV;
      this.transform = {
          ...this.transform,
          flipH: flippedV,
          flipV: flippedH
      };
  }


  flipHorizontal() {
      this.transform = {
          ...this.transform,
          flipH: !this.transform.flipH
      };
  }

  flipVertical() {
      this.transform = {
          ...this.transform,
          flipV: !this.transform.flipV
      };
  }

  resetImage() {
      this.scale = 1;
      this.rotation = 0;
      this.canvasRotation = 0;
      this.transform = {};
  }

  zoomOut() {
      this.scale -= .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  zoomIn() {
      this.scale += .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  toggleContainWithinAspectRatio() {
      this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  alterarRubrica() {
      this.rubricaAtual.hasRubrica = false;
  }

  updateRotation() {
    this.transform = {
        ...this.transform,
        rotate: this.rotation
    };
  }

  info(){
    const dialogRef = this.dialog.open(RubricaInfoComponent, {width: "50%"});
  }
}
