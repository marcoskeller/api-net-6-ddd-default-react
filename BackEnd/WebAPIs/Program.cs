using Domain.Interfaces.Generics;
using Domain.Interfaces;
using Infrastructure.Configuration;
using Infrastructure.Repository.Generics;
using Infrastructure.Repository.Repositories;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces.InterfaceServices;
using Domain.Services;
using Entities.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using WebAPIs.Token;
using AutoMapper;
using WebAPIs.Models;

var builder = WebApplication.CreateBuilder(args);

/*Adicionando Servi�os ao Cont�iner.*/
builder.Services.AddControllers();


//Configurando Swagger na Aplica��o - Saiba mais sobre como configurar Swagger/OpenAPI em https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//Configurando a string de conex�o
builder.Services.AddDbContext<ContextBase>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


//Configurando a aplica��o para usar os usu�rios do Identity
builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ContextBase>();

//Adcionando Controllers com Views
builder.Services.AddControllersWithViews();


//Adicionando P�ginas Razors
builder.Services.AddRazorPages();



/*Configurando Interface e Reposit�rio */
builder.Services.AddSingleton(typeof(IGeneric<>), typeof(RepositoryGenerics<>));
builder.Services.AddSingleton<IMessage, RepositoryMessage>();


/*Configura��o do Servi�o de Dom�nio */
builder.Services.AddSingleton<IServiceMessage, ServiceMessage>();


/*Configurando JWT*/
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(option =>
      {
          option.TokenValidationParameters = new TokenValidationParameters
          {
              ValidateIssuer = false,
              ValidateAudience = false,
              ValidateLifetime = true,
              ValidateIssuerSigningKey = true,

              ValidIssuer = "Mundo DEV",
              ValidAudience = "Mundo DEV",
              IssuerSigningKey = JwtSecurityKey.Create("Secret_Key-12345678")
          };

          option.Events = new JwtBearerEvents
          {
              OnAuthenticationFailed = context =>
              {
                  Console.WriteLine("OnAuthenticationFailed: " + context.Exception.Message);
                  return Task.CompletedTask;
              },
              OnTokenValidated = context =>
              {
                  Console.WriteLine("OnTokenValidated: " + context.SecurityToken);
                  return Task.CompletedTask;
              }
          };
      });


/*Configurando o AutoMapper do Projeto*/
var config = new AutoMapper.MapperConfiguration(cfg =>
{
    cfg.CreateMap<MessageViewModel, Message>();
    cfg.CreateMap<Message, MessageViewModel>();
});

IMapper mapper = config.CreateMapper();
builder.Services.AddSingleton(mapper);


//Inicializa��o do build
var app = builder.Build();


/*Configura��o do pipeline de solicita��o HTTP */
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


/*Configurando o Cors - Que � libera��o de acesso de quem poder� acessar nossa aplica��o*/

//Configurando o Cors para Desenvolvimento
var devClient = "http://localhost:4200";

app.UseCors(x => x
.AllowAnyOrigin()
.AllowAnyMethod()
.AllowAnyHeader().WithOrigins(devClient));

//Configurando o Cors para Diversos Ambientes como DEV, HML ou PRD
//var urlDev = "https://dominiodocliente.com.br";
//var urlHML = "https://dominiodocliente2.com.br";
//var urlPROD = "https://dominiodocliente3.com.br";
//app.UseCors(b => b.WithOrigins(urlDev, urlHML, urlPROD));




app.UseHttpsRedirection();

//Configurando para usar a Autoriza��o do JWT
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

//Configurando para Usar o Swagger como documenta��o da nossa API
app.UseSwaggerUI();

app.Run();
