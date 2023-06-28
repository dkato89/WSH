# WSH - ASP.net és Angular fejlesztési feladat 

Ez a projekt egy interjúnak a fejlesztési részéhez készült.

## Feladat leírás

Készítsd egy angular webappot és a hozzá tartozó .net Core backend-et, az alábbi funkciókkal. 
·Bejelentkezés
·User regisztráció
·Bejelentkezett oldal funkciója: Jelenítse meg az MNB interfészéről (https://www.mnb.hu/arfolyamok.asmx) lekérdezhető árfolyamokat egy táblázatban.
·Mini form, ahol megadott input adatra (forint összeg) kiírja a program az annak megfelelő EUR összeget.

## Install

1. Telepítsd a legújabb [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
2. Telepítsd a legújabb [Node.js](https://nodejs.org/en/)
3. Navigálj a `src/WebUI/ClientApp` könyvtárba és futtasd az `npm install` paranmcsot, ezzel telepíted a klienshez szükséges csomagokat
4. Navigálj a `src/WebUI/ClientApp` könyvtárba és futtasd az `npm start` parancsot, ami elindítja az Angular klienst
5. src/WebUI/appsettings-ben DB ConnectionString beállítása egy létező SqlServer-re
6. Navigálj a `src/WebUI` könyvtárba és futtasd a `dotnet run` parancsot, ami elindítja a ASP.NET Core MVC backendet

## Technológiák

* [ASP.NET Core 7](https://docs.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-7.0)
* [Entity Framework Core 7](https://docs.microsoft.com/en-us/ef/core/)
* [Angular 16](https://angular.io/)
* [Autofac](https://autofac.org/)
* [MediatR](https://github.com/jbogard/MediatR)
* [AutoMapper](https://automapper.org/)
* [FluentValidation](https://fluentvalidation.net/)
* [Docker](https://www.docker.com/)
