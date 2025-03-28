import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recurso } from '../models/recurso';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + (localStorage.getItem('token') ?? ''),
  });

  constructor(private client: HttpClient) { }


  listarEditais(): Observable<any> {
    return this.client.get(environment.apiUrl + '/edital');
  }
  criarRecurso(recurso: Recurso): Observable<any> {
    return this.client.post(environment.apiUrl + '/recurso', recurso);
  }
  criarEdital(edital: any): Observable<any> {

    return this.client.post(environment.apiUrl + '/edital', {
      numero: edital.numero,
      ano: edital.ano,
      descricao: edital.descricao,
      aberto: edital.aberto,
      ongId: edital.ongId
    });
  }
  atualizarEdital(edital: any): Observable<any> {

    return this.client.put(environment.apiUrl + '/edital', {
      id: edital.id,
      numero: edital.numero,
      ano: edital.ano,
      descricao: edital.descricao,
      aberto: edital.aberto,
      ongId: edital.ongId
    });
  }
  login(email: string, senha: string): Observable<any> {
    const body = {
      email: email,
      password: senha
    }
    return this.client.post(environment.apiUrl + '/login', body);
  }

  liestarEditaisPorAno(ano: number, ong: number): Observable<any> {
    return this.client.get(environment.apiUrl + '/edital/filtrar?ano=' + ano + '&ong=' + ong, { headers: this.headers });
  }
  listarProcessosSeletivos(): Observable<any> {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('token') ?? ''),
    });
    return this.client.get(environment.apiUrl + '/ong', { headers: this.headers });
  }

  criarLink(link: any): Observable<any> {

    return this.client.post(environment.apiUrl + '/link', {
      nome: link.nome,
      url: link.url,
      editalId: link.editalId
    }, { headers: this.headers });
  }
  atualizarLink(link: any): Observable<any> {

    return this.client.put(environment.apiUrl + '/link', {
      id: link.id,
      nome: link.nome,
      url: link.url,
      editalId: link.editalId,

    }, { headers: this.headers });
  }
}
