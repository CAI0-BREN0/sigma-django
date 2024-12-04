from django.urls import path
from .views import validar_usuario, home, login, veiculos, criar_veiculos, listar_veiculos, clientes, criar_clientes, cadastro, listar_clientes, operacoes

urlpatterns = [
    path('login/', login, name='login'),
    path('home/', home, name='home'),
    path('veiculos/', veiculos, name='veiculos'),
    path('validar-usuario/', validar_usuario, name='validar_usuario'),
    path('criar-veiculos/',criar_veiculos,name='criar_veiculos'),
    path('listar-veiculos/', listar_veiculos, name='listar_veiculos'),
    path('clientes/', clientes, name= 'clientes'),
    path('criar-clientes/', criar_clientes, name='criar_clientes'),
    path('cadastro/', cadastro, name='cadastro'),
    path('listar-clientes/', listar_clientes, name='listar_clientes'),
    path('operacoes/', operacoes, name='operacoes')
]
