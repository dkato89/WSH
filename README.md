# MORTOFF - ASP.net fejlesztési feladat 

Ez a projekt egy interjúnek a fejlesztési részéhez készült. Az elkészült feladatot ezen a linken tudod megtekinteni: [https://mortoff.wildsec.ws/](https://mortoff.wildsec.ws/)

## Feladat leírás

Készítsd egy angular webappot és a hozzá tartozó .net Core backend-et, az alábbi funkciókkal. 
·Bejelentkezés
·User regisztráció
·Bejelentkezett oldal funkciója: Jelenítse meg az MNB interfészéről (https://www.mnb.hu/arfolyamok.asmx) lekérdezhető árfolyamokat egy táblázatban.
·Mini form, ahol megadott input adatra (forint összeg) kiírja a program az annak megfelelő EUR összeget.

## EF panancsok

ADD MIGRATION:
Add-Migration -Name "InitDB" -OutputDir "Migrations" -Context "Persistence.AppDbContext" -Project "Persistence"

UPDATE DATABASE:
Update-Database -Context "Persistence.AppDbContext" -Project "Persistence"

## Install

1. Telepítsd a legújabb [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
2. Telepítsd a legújabb [Node.js](https://nodejs.org/en/)
3. Navigálj a `src/WebUI/ClientApp` könyvtárba és futtasd az `npm install` paranmcsot, ezzel telepíted a klienshez szükséges csomagokat
4. Navigálj a `src/WebUI/ClientApp` könyvtárba és futtasd az `npm start` parancsot, ami elindítja az Angular klienst
5. Navigálj a `src/WebUI` könyvtárba és futtasd a `dotnet run` parancsot, ami elindítja a ASP.NET Core MVC backendet

### Alternatív futtatás

Lehetősége van docker containerben futtatni az alkalmazást. Ehhez a következő parancsot futtasd:

`docker run --rm -p 5000:80 --name mortoff wildsec/mortoffapp`

## Technológiák

* [ASP.NET Core 7](https://docs.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-7.0)
* [Entity Framework Core 7](https://docs.microsoft.com/en-us/ef/core/)
* [Angular 13](https://angular.io/)
* [MediatR](https://github.com/jbogard/MediatR)
* [AutoMapper](https://automapper.org/)
* [FluentValidation](https://fluentvalidation.net/)
* [Docker](https://www.docker.com/)

