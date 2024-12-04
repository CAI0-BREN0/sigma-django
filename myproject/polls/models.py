from django.db import models
from django.contrib.auth.models import User


class Veiculo(models.Model):
    Modelo = models.CharField(max_length=20)
    Placa = models.CharField(max_length=10)
    Marca = models.CharField(max_length=20)
    Upload = models.ImageField(upload_to="cars")

class Login(models.Model):
    Usuario = models.CharField(max_length=10)
    Senha = models.CharField(max_length=20)

class Cadastro(models.Model):
    Nome = models.CharField(max_length=50)
    Usuario = models.CharField(max_length=10)
    Senha = models.CharField(max_length=20)

class Clientes(models.Model):
    Nome = models.CharField(max_length=50)
    CPF = models.CharField(max_length=11)
    Endereço = models.CharField(max_length=200)