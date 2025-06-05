# Usa la imagen oficial de .NET para runtime y build
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Partes.Server/Partes.Server.csproj", "Partes.Server/"]
RUN dotnet restore "Partes.Server/Partes.Server.csproj"
COPY . .
WORKDIR "/src/Partes.Server"
RUN dotnet build "Partes.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Partes.Server.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Partes.Server.dll"]
