from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.views.generic import ListView, CreateView
from polls.models import Veiculo, Cadastro, Login, Clientes

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def home(request):
    return render(request, "polls/home.html")  

def login(request):
    return render(request,"polls/login.html")

def veiculos(request):
    return render(request,"polls/veiculos.html")

def clientes(request):
    return render(request,"polls/clientes.html")

def cadastro(request):
    return render(request,"polls/signup.html")

def operacoes(request):
    return render(request, "polls/operacoes.html")



@csrf_exempt
def validar_usuario(request):
    if request.method == 'POST':
        dados = json.loads(request.body)
        username = dados.get('usuario')
        senha = dados.get('senha')

        try:
            usuario = Login.objects.get(Usuario=username, Senha=senha)
            return JsonResponse({
                'status': 'success',
                'nome': usuario.Usuario,
                'token': 'gerar_token_aqui',  # Substituir por lógica real de geração de token
            })
        except Login.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Usuário ou senha inválidos.'}, status=401)

    return JsonResponse({'status': 'error', 'message': 'Método não permitido.'}, status=405)

@csrf_exempt
def criar_veiculos(request):
    if request.method == 'POST':
        dados = json.loads(request.body)

        modelo = dados.get('modelo')
        placa = dados.get('placa')
        marca = dados.get('marca')
        imagemUrl = dados.get('imagemUrl')
        try:
            veiculo = Veiculo.objects.create(
                            Modelo=modelo,
                            Placa=placa,
                            Marca=marca,
                            Upload=imagemUrl
                        )           
            return JsonResponse({
                'status': 'success',
            })
        except Login.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Dados inválidos do veículo.'}, status=401)

    return JsonResponse({'status': 'error', 'message': 'Método não permitido.'}, status=405)

@csrf_exempt
def criar_clientes(request):
    if request.method == 'POST':
        dados = json.loads(request.body)

        nome = dados.get('nome')
        cpf = dados.get('cpf')
        endereco = dados.get('endereco')
        try:
            clientes = Clientes.objects.create(
                            Nome=nome,
                            CPF=cpf,
                            Endereço=endereco
                        )           
            return JsonResponse({
                'status': 'success',
            })
        except Login.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Dados invalidos do cliente.'}, status=401)

    return JsonResponse({'status': 'error', 'message': 'Método não permitido.'}, status=405)

@csrf_exempt
def listar_veiculos(request):
    if request.method == 'GET':
        try:
            veiculos = Veiculo.objects.all()  # Obtendo todos os veículos
            veiculos_data = []
            for veiculo in veiculos:
                veiculos_data.append({
                    'id': veiculo.id,
                    'modelo': veiculo.Modelo,
                    'placa': veiculo.Placa,
                    'marca': veiculo.Marca,
                    'imagemUrl': veiculo.Upload.url if veiculo.Upload else None  
                })

            return JsonResponse({'status': 'success', 'veiculos': veiculos_data})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

    return JsonResponse({'status': 'error', 'message': 'Método não permitido.'}, status=405)

def listar_clientes(request):
    if request.method == 'GET':
        try:
            clientes = Clientes.objects.all()  
            clientes_data = []
            for clientes in clientes:
                clientes_data.append({
                    'id': clientes.id,
                    'nome': clientes.Nome,
                    'cpf': clientes.CPF,
                    'endereco': clientes.Endereço
                })

            return JsonResponse({'status': 'success', 'clientes': clientes_data})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

    return JsonResponse({'status': 'error', 'message': 'Método não permitido.'}, status=405)
# Create your views here.
