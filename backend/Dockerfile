FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Sadece csproj dosyalarını kopyalayarak restore yapıyoruz (Layer cache avantajı için)
COPY ["Portfolio.API/Portfolio.API.csproj", "Portfolio.API/"]
COPY ["Portfolio.Application/Portfolio.Application.csproj", "Portfolio.Application/"]
COPY ["Portfolio.Domain/Portfolio.Domain.csproj", "Portfolio.Domain/"]
COPY ["Portfolio.Infrastructure/Portfolio.Infrastructure.csproj", "Portfolio.Infrastructure/"]

RUN dotnet restore "Portfolio.API/Portfolio.API.csproj"

# Tüm kodları kopyalayıp publish alıyoruz
COPY . .
WORKDIR "/src/Portfolio.API"
RUN dotnet publish "Portfolio.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime imajı oluşturuluyor
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "Portfolio.API.dll"]
