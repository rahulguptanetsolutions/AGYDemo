import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../product.service';
import { switchMap, of } from 'rxjs';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    productForm: FormGroup;
    isEditMode = false;
    productId: number | null = null;
    submitLabel = 'Create';

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService
    ) {
        this.productForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: [''],
            price: [0, [Validators.required, Validators.min(0)]]
        });
    }

    ngOnInit(): void {
        this.route.paramMap.pipe(
            switchMap(params => {
                const id = params.get('id');
                if (id && id !== 'new') {
                    this.isEditMode = true;
                    this.productId = +id;
                    this.submitLabel = 'Update';
                    return this.productService.getProduct(this.productId);
                }
                return of(null);
            })
        ).subscribe(product => {
            if (product) {
                this.productForm.patchValue(product);
            }
        });
    }

    onSubmit(): void {
        if (this.productForm.invalid) return;

        const productData = this.productForm.value;
        const save$ = (this.isEditMode && this.productId)
            ? this.productService.saveProduct({ ...productData, id: this.productId })
            : this.productService.saveProduct(productData);

        save$.subscribe(() => {
            this.router.navigate(['/products']);
        });
    }
}
