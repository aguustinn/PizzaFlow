using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configuração de CORS para permitir chamadas do Gateway
builder.Services.AddCors();
builder.Services.AddDbContext<InventoryDb>(opt => opt.UseInMemoryDatabase("PizzaInventory"));

var app = builder.Build();
app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Rota 1: Listar todo o estoque
app.MapGet("/api/inventory", async (InventoryDb db) => 
    await db.Ingredients.ToListAsync());

// Rota 2: Dar baixa no estoque
app.MapPost("/api/inventory/consume", async (ConsumeRequest req, InventoryDb db) => {
    var item = await db.Ingredients.FirstOrDefaultAsync(i => i.Name.ToLower() == req.Ingredient.ToLower());
    
    if (item != null && item.Quantity >= req.Amount) {
        item.Quantity -= req.Amount;
        await db.SaveChangesAsync();
        return Results.Ok(new { message = $"Consumido {req.Amount} de {req.Ingredient}. Restam: {item.Quantity}" });
    }
    
    return Results.BadRequest(new { error = "Estoque insuficiente ou ingrediente não encontrado." });
});

// Popular o banco de dados inicial (Seed)
using (var scope = app.Services.CreateScope()) {
    var db = scope.ServiceProvider.GetRequiredService<InventoryDb>();
    db.Ingredients.AddRange(
        new Ingredient { Id = 1, Name = "Massa", Quantity = 100 },
        new Ingredient { Id = 2, Name = "Queijo", Quantity = 50 },
        new Ingredient { Id = 3, Name = "Pepperoni", Quantity = 30 }
    );
    db.SaveChanges();
}

app.Run();

// --- Modelos de Dados ---
class Ingredient {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Quantity { get; set; }
}

class ConsumeRequest {
    public string Ingredient { get; set; } = string.Empty;
    public int Amount { get; set; }
}

class InventoryDb : DbContext {
    public InventoryDb(DbContextOptions<InventoryDb> options) : base(options) { }
    public DbSet<Ingredient> Ingredients => Set<Ingredient>();
}