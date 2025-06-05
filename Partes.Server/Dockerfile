# Imagen base para ejecutar apps ASP.NET Core 9
FROM mcr.microsoft.com/dotnet/aspnet:9.0-preview AS base
WORKDIR /app
EXPOSE 80

# Imagen para compilar proyectos .NET 9
FROM mcr.microsoft.com/dotnet/sdk:9.0-preview AS build
WORKDIR /src

# Copia solo el proyecto del backend
COPY Partes.Server/Partes.Server.csproj Partes.Server/

# Restaura solo el backend
RUN dotnet restore Partes.Server/Partes.Server.csproj

# Copia todo el código (incluye partes.client pero no se compilará)
COPY . .

# Compila solo el backend
WORKDIR /src/Partes.Server
RUN dotnet build Partes.Server.csproj -c Release -o /app/build

# Publica solo el backend
FROM build AS publish
RUN dotnet publish Partes.Server.csproj -c Release -o /app/publish

# Imagen final
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Partes.Server.dll"]
