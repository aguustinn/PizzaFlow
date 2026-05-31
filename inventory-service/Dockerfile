# Etapa de Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /App

# Copia tudo e compila
COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

# Etapa de Runtime (Execução)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /App
COPY --from=build-env /App/out .

# Configura a porta que o Render vai expor
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "inventory-service.dll"]