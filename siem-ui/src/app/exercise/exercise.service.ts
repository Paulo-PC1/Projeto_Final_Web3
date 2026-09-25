import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

export interface Exercise {
  id?: number;
  statement: string;
  operation: string;
  correctAnswer: number;
  active: boolean;
}