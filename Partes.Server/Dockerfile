# Imagen base para ejecutar apps ASP.NET Core 9
FROM mcr.microsoft.com/dotnet/aspnet:9.0-preview AS base
WORKDIR /app
EXPOSE 80

# Imagen para compilar proyectos .NET 9
FROM mcr.microsoft.com/dotnet/sdk:9.0-preview AS build
WORKDIR /src

# Copia y restaura el proyecto
COPY ["Partes.Server/Partes.Server.csproj", "Partes.Server/"]
RUN dotnet restore "Partes.Server/Partes.Server.csproj"

# Copia todo el código
COPY . .
WORKDIR "/src/Partes.Server"
RUN dotnet build "Partes.Server.csproj" -c Release -o /app/build

# Publica en modo release
FROM build AS publish
RUN dotnet publish "Partes.Server.csproj" -c Release -o /app/publish

# Imagen final
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Partes.Server.dll"]
