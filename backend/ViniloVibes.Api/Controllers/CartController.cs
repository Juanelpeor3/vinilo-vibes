using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ViniloVibes.Api.DTOs.Cart;
using ViniloVibes.Api.Services.Interfaces;

namespace ViniloVibes.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    private string GetUserId() =>
        User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CartItemDto>>> GetCart()
    {
        var items = await _cartService.GetCartAsync(GetUserId());
        return Ok(items);
    }

    [HttpPost]
    public async Task<ActionResult<CartItemDto>> AddToCart(AddToCartDto dto)
    {
        var item = await _cartService.AddToCartAsync(GetUserId(), dto);
        return Created("", item);
    }

    [HttpPut("{vinylId}")]
    public async Task<ActionResult<CartItemDto>> UpdateQuantity(int vinylId, UpdateCartItemDto dto)
    {
        var item = await _cartService.UpdateQuantityAsync(GetUserId(), vinylId, dto);
        if (item is null) return NotFound();
        return Ok(item);
    }

    [HttpDelete("{vinylId}")]
    public async Task<IActionResult> RemoveItem(int vinylId)
    {
        var removed = await _cartService.RemoveFromCartAsync(GetUserId(), vinylId);
        if (!removed) return NotFound();
        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> ClearCart()
    {
        await _cartService.ClearCartAsync(GetUserId());
        return NoContent();
    }
}