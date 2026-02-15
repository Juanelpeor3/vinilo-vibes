import { Component, inject, signal } from '@angular/core';
import { VinylService } from '../../services/vinyl/vinyl';
import { Vinyl } from '../../shared/models/vinyl-model';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PageNotFound } from "../page-not-found/page-not-found";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { StarRating } from "../../shared/components/star-rating/star-rating";
import { StockData } from "../../shared/components/stock-data/stock-data";
import { AuthService } from '../../services/auth/auth';
import { CartService } from '../../services/cart/cart';
import { WarnModal } from '../../shared/components/warn-modal/warn-modal';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vinyl-details',
  imports: [PageNotFound, MatProgressSpinner, StarRating, StockData],
  templateUrl: './vinyl-details.html',
  styleUrl: './vinyl-details.scss',
})
export class VinylDetails {
  private vinylService = inject(VinylService);
  private authService = inject(AuthService);
  private cartService = inject(CartService);

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  genre_names: Record<string, string> = {
    '1': 'Rock',
    '2': 'Jazz',
    '3': 'Pop',
    '4': 'Hiphop',
    '5': 'Electrónica'
  };

  vinyl = signal<Vinyl | null>(null);
  isLoading = signal(true);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        const data = await this.vinylService.getById(id);
        this.vinyl.set(data);
        const title = data?.title

        // Crear título dinámico
        this.titleService.setTitle(`${title} | Vinilo Vibes`)
      } catch (error) {
        this.vinyl.set(null);
      } finally {
        this.isLoading.set(false);
      }
    } else {
      this.isLoading.set(false);
    }
  }

  async addToCart(vinyl: Vinyl) {
    const { data } = await this.authService.checkAuth();
    if (!data.session) {
      this.openWarnModal("Para agregar productos al carrito, debes iniciar sesión", "¿Quieres iniciar sesión ahora?");
      return;
    } else {
      this.cartService.addToCart(vinyl);
      // Se muestra un snackbar de que el producto se ha añadido al carrito
      const snackBarRef = this.snackBar.open('Producto añadido al carrito', 'VER CARRITO', {
        duration: 3000, // Tiempo en pantalla
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      // Si se da al botón se redirige al carrito
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['/cart']);
      });
    }
  }

  openWarnModal(title: string, message: string) {
    const dialogRef = this.dialog.open(WarnModal, {
      width: '450px',
      data: {
        title: title,
        message: message
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(["/auth/login"]);
      }
    });
  }
}