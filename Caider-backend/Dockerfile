# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY CaiderBackend/*.csproj ./CaiderBackend/
RUN dotnet restore ./CaiderBackend/CaiderBackend.csproj

COPY . .
RUN dotnet publish ./CaiderBackend/CaiderBackend.csproj -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "CaiderBackend.dll"]