# Imagen base para ejecutar apps ASP.NET Core 9
FROM mcr.microsoft.com/dotnet/aspnet:9.0-preview AS base
WORKDIR /app
EXPOSE 80

# Imagen para compilar proyectos .NET 9
FROM mcr.microsoft.com/dotnet/sdk:9.0-preview AS build
WORKDIR /src

# Copia solo el backend
COPY Partes.Server/ ./Partes.Server/

# Restaura dependencias
WORKDIR /src/Partes.Server
RUN dotnet restore

# Compila el backend (sin dependencias a otros proyectos)
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Imagen final
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Partes.Server.dll"]
