using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ViniloVibes.Api.DTOs.Orders;
using ViniloVibes.Api.Services.Interfaces;

namespace ViniloVibes.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    private string GetUserId() =>
        User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    [HttpPost("checkout")]
    public async Task<ActionResult<OrderDto>> Checkout()
    {
        try
        {
            var order = await _orderService.CheckoutAsync(GetUserId());
            return Created("", order);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderSummaryDto>>> GetOrders()
    {
        var orders = await _orderService.GetOrdersAsync(GetUserId());
        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> GetOrder(int id)
    {
        var order = await _orderService.GetOrderByIdAsync(id, GetUserId());
        if (order is null) return NotFound();
        return Ok(order);
    }
}