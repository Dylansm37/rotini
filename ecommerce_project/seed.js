// Import Firebase Admin SDK using ES module syntax
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { createRequire } from 'module';

// Use createRequire to import JSON files in ES modules
const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'cpsc-449-project.firebasestorage.app'
});

const db = getFirestore();
const storage = getStorage();
const bucket = storage.bucket();

// Global flag for storage connectivity
let storageIsConnected = false;

// Helper function to verify if an image exists in Firebase Storage
async function verifyImageExists(storagePath) {
  if (!storagePath) return true; // Skip check if no path
  if (!storageIsConnected) {
    // Skip verification if storage is not connected
    return true;
  }
  
  try {
    // Extract the file path from the full gs:// URI
    const filePath = storagePath.replace('gs://cpsc-449-project.firebasestorage.app/', '');
    const file = bucket.file(filePath);
    const [exists] = await file.exists();
    
    if (!exists) {
      console.warn(`Warning: Image does not exist at path: ${storagePath}`);
    }
    
    return exists;
  } catch (error) {
    console.error(`Error checking if image exists: ${storagePath}`, error);
    return false;
  }
}

// Helper function to add documents with specified IDs
async function addDocumentWithId(collection, id, data) {
  try {
    // Verify all image paths in the data
    if (data.images && Array.isArray(data.images)) {
      for (const image of data.images) {
        if (image.storagePath) {
          await verifyImageExists(image.storagePath);
        }
      }
    }
    
    // Check for logo field (for brands)
    if (data.logo) {
      await verifyImageExists(data.logo);
    }
    
    await db.collection(collection).doc(id).set({
      ...data,
      id,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });
    console.log(`Added document ${id} to ${collection}`);
  } catch (error) {
    console.error(`Error adding document ${id} to ${collection}:`, error);
    throw error;
  }
}

// Helper function to add multiple documents in a batch for better performance
async function batchAddDocuments(collection, documents) {
  const batchSize = 500; // Firestore limit is 500 operations per batch
  const batches = [];
  
  for (let i = 0; i < documents.length; i += batchSize) {
    const batch = db.batch();
    const currentBatch = documents.slice(i, i + batchSize);
    
    for (const doc of currentBatch) {
      const docRef = db.collection(collection).doc(doc.id);
      batch.set(docRef, {
        ...doc,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
    }
    
    batches.push(batch.commit());
  }
  
  try {
    await Promise.all(batches);
    console.log(`Added ${documents.length} documents to ${collection} in batches`);
  } catch (error) {
    console.error(`Error batch adding documents to ${collection}:`, error);
    throw error;
  }
}

// Seed Users
async function seedUsers() {
  const users = [
    {
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-123-4567',
      role: 'customer'
    },
    {
      id: 'user2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '555-987-6543',
      role: 'customer'
    },
    {
      id: 'admin1',
      name: 'Admin User',
      email: 'admin@example.com',
      phone: '555-555-5555',
      role: 'admin'
    },
    {
      id: 'manager1',
      name: 'Manager User',
      email: 'manager@example.com',
      phone: '555-444-3333',
      role: 'manager'
    }
  ];

  // Use batch writing for better performance
  await batchAddDocuments('users', users);
}

// Seed Categories
async function seedCategories() {
  const categories = [
    {
      id: 'cat1',
      name: 'Synthetic Engine Oil',
      description: 'Full synthetic oils for superior engine performance',
      image: './assets/category_images/synthetic-oil.png'
    },
    {
      id: 'cat2',
      name: 'Conventional Engine Oil',
      description: 'Traditional mineral-based engine oils',
      image: '/src/assets/category_images/conventional-oil.jpg'
    },
    {
      id: 'cat3',
      name: 'High Mileage Engine Oil',
      description: 'Specialized oils for vehicles with over 75,000 miles',
      image: '/src/assets/category_images/high-mileage-oil.jpg'
    },
    {
      id: 'cat4',
      name: 'Racing & Performance Oil',
      description: 'High-performance oils for racing and sports vehicles',
      image: '/src/assets/category_images/racing-oil.jpg'
    },
    {
      id: 'cat5',
      name: 'Diesel Engine Oil',
      description: 'Heavy-duty oils for diesel engines',
      image: '/src/assets/category_images/diesel-oil.jpg'
    }
  ];

  // Use batch writing for better performance
  await batchAddDocuments('categories', categories);
}

// Seed Brands
async function seedBrands() {
  const brands = [
    {
      id: 'brand1',
      name: 'Mobil 1',
      description: 'Premium synthetic motor oil providing exceptional performance and protection',
      logo: 'gs://cpsc-449-project.firebasestorage.app/brand_logos/mobil1-logo.jpg',
      featured: true
    },
    {
      id: 'brand2',
      name: 'Castrol',
      description: 'High-quality lubricants for automotive, industrial, and marine applications',
      logo: 'gs://cpsc-449-project.firebasestorage.app/brand_logos/castrol-logo.jpg',
      featured: true
    },
    {
      id: 'brand3',
      name: 'Pennzoil',
      description: 'Motor oils and lubricants made from natural gas',
      logo: 'gs://cpsc-449-project.firebasestorage.app/brand_logos/pennzoil-logo.jpg',
      featured: true
    },
    {
      id: 'brand4',
      name: 'Valvoline',
      description: 'Premium motor oils, additives, and automotive chemicals',
      logo: 'gs://cpsc-449-project.firebasestorage.app/brand_logos/valvoline-logo.jpg',
      featured: false
    },
    {
      id: 'brand5',
      name: 'Shell',
      description: 'Advanced synthetic oil technology for maximum engine performance',
      logo: 'gs://cpsc-449-project.firebasestorage.app/brand_logos/shell-logo.jpg',
      featured: false
    }
  ];

  // Verify all logo image paths
  for (const brand of brands) {
    if (brand.logo) {
      await verifyImageExists(brand.logo);
    }
  }

  // Use batch writing for better performance
  await batchAddDocuments('brands', brands);
}

// Seed Products
async function seedProducts() {
  const products = [
    {
      id: 'prod1',
      name: 'Mobil 1 Extended Performance Full Synthetic 5W-30',
      description: 'Advanced full synthetic motor oil designed to keep your engine running like new by providing exceptional wear protection, cleaning power and overall performance. Guaranteed protection for up to 20,000 miles between oil changes.',
      price: 52.99,
      stock: 150,
      categoryId: 'cat1',
      brandId: 'brand1',
      sizeOptions: [
        {
          id: 'small',
          name: 'Small',
          volume: '5 Quart',
          price: 52.99,
          inStock: true
        },
        {
          id: 'medium',
          name: 'Medium',
          volume: '50 Quart (10% Discount)',
          price: 476.91,
          inStock: true
        },
        {
          id: 'large',
          name: 'Large',
          volume: '100 Quart (20% Discount)',
          price: 847.84,
          inStock: true
        }
      ],
      images: [
        {
          storagePath: 'gs://cpsc-449-project.firebasestorage.app/product_images/mobil1-5w30-1.jpg',
          alt: 'Mobil 1 Extended Performance 5W-30 bottle front view',
          isPrimary: true
        },
        {
          storagePath: 'gs://cpsc-449-project.firebasestorage.app/product_images/mobil1-5w-30-2.jpg',
          alt: 'Mobil 1 Extended Performance 5W-30 technical specs',
          isPrimary: false
        }
      ],
      isActive: true
    },
    {
      id: 'prod2',
      name: 'Castrol EDGE Advanced Full Synthetic 0W-40',
      description: 'Advanced full synthetic formula with Fluid Titanium Technology transforms to be stronger under pressure, reducing friction for maximum engine performance. Recommended for high-performance, luxury vehicles and sports cars.',
      price: 89.99,
      stock: 75,
      categoryId: 'cat4',
      brandId: 'brand2',
      sizeOptions: [
        {
          id: 'small',
          name: 'Small',
          volume: '5 Quart',
          price: 89.99,
          inStock: true
        },
        {
          id: 'medium',
          name: 'Medium',
          volume: '50 Quart (10% Discount)',
          price: 809.91,
          inStock: true
        },
        {
          id: 'large',
          name: 'Large',
          volume: '100 Quart (20% Discount)',
          price: 1439.84,
          inStock: false
        }
      ],
      images: [
        {
          storagePath: 'gs://cpsc-449-project.firebasestorage.app/product_images/castrol-edge-0w40-1.jpg',
          alt: 'Castrol EDGE 0W-40 bottle',
          isPrimary: true
        }
      ],
      isActive: true
    },
    {
      id: 'prod3',
      name: 'Shell Rotella T6 Diesel Engine Oil 15W-40',
      description: 'Heavy-duty diesel engine oil that provides triple protection plus against wear, deposits and oil breakdown. Designed for modern, low-emission engines in trucking, agriculture, and construction applications.',
      price: 45.99,
      stock: 100,
      categoryId: 'cat5',
      brandId: 'brand5',
      sizeOptions: [
        {
          id: 'small',
          name: 'Small',
          volume: '5 Quart',
          price: 45.99,
          inStock: true
        },
        {
          id: 'medium',
          name: 'Medium',
          volume: '50 Quart (10% Discount)',
          price: 413.91,
          inStock: true
        },
        {
          id: 'large',
          name: 'Large',
          volume: '100 Quart (20% Discount)',
          price: 735.84,
          inStock: true
        }
      ],
      images: [
        {
          storagePath: 'gs://cpsc-449-project.firebasestorage.app/product_images/shell-rotella-15w40-1.jpg',
          alt: 'Shell Rotella T6 15W-40 container',
          isPrimary: true
        }
      ],
      isActive: true
    },
    {
      id: 'prod4',
      name: 'Valvoline High Mileage SAE 10W-30',
      description: 'Specially formulated for vehicles with over 75,000 miles. Contains seal conditioners to help prevent leaks, extra detergents to reduce sludge and deposits, and antioxidants to prevent oil breakdown.',
      price: 36.99,
      stock: 200,
      categoryId: 'cat3',
      brandId: 'brand4',
      sizeOptions: [
        {
          id: 'small',
          name: 'Small',
          volume: '5 Quart',
          price: 36.99,
          inStock: true
        },
        {
          id: 'medium',
          name: 'Medium',
          volume: '50 Quart (10% Discount)',
          price: 332.91,
          inStock: true
        },
        {
          id: 'large',
          name: 'Large',
          volume: '100 Quart (20% Discount)',
          price: 591.84,
          inStock: true
        }
      ],
      images: [
        {
          storagePath: 'gs://cpsc-449-project.firebasestorage.app/product_images/valvoline-high-mileage-10w30-1.jpg',
          alt: 'Valvoline High Mileage 10W-30 bottle',
          isPrimary: true
        }
      ],
      isActive: true
    },
    {
      id: 'prod5',
      name: 'Pennzoil Platinum Full Synthetic 5W-20',
      description: 'Made from natural gas, not crude, using PurePlus Technology that converts pure natural gas into high quality, full synthetic base oil. Provides complete protection for top engine performance.',
      price: 47.99,
      stock: 250,
      categoryId: 'cat1',
      brandId: 'brand3',
      sizeOptions: [
        {
          id: 'small',
          name: 'Small',
          volume: '5 Quart',
          price: 47.99,
          inStock: true
        },
        {
          id: 'medium',
          name: 'Medium',
          volume: '50 Quart (10% Discount)',
          price: 431.91,
          inStock: true
        },
        {
          id: 'large',
          name: 'Large',
          volume: '100 Quart (20% Discount)',
          price: 767.84,
          inStock: true
        }
      ],
      images: [
        {
          storagePath: 'gs://cpsc-449-project.firebasestorage.app/product_images/pennzoil-platinum-5w20-1.jpg',
          alt: 'Pennzoil Platinum 5W-20 bottle',
          isPrimary: true
        }
      ],
      isActive: true
    }
  ];

  // Check all image paths before adding to Firestore
  for (const product of products) {
    if (product.images && Array.isArray(product.images)) {
      for (const image of product.images) {
        if (image.storagePath) {
          await verifyImageExists(image.storagePath);
        }
      }
    }
  }

  // Use batch writing for better performance
  await batchAddDocuments('products', products);
}

// Seed Inventory
async function seedInventory() {
  const inventoryItems = [
    {
      id: 'inv1',
      productId: 'prod1',
      quantityAvailable: 150,
      lowStockThreshold: 30,
      lastRestocked: Timestamp.fromDate(new Date('2023-01-15'))
    },
    {
      id: 'inv2',
      productId: 'prod2',
      quantityAvailable: 75,
      lowStockThreshold: 15,
      lastRestocked: Timestamp.fromDate(new Date('2023-02-10'))
    },
    {
      id: 'inv3',
      productId: 'prod3',
      quantityAvailable: 100,
      lowStockThreshold: 20,
      lastRestocked: Timestamp.fromDate(new Date('2023-01-20'))
    },
    {
      id: 'inv4',
      productId: 'prod4',
      quantityAvailable: 200,
      lowStockThreshold: 40,
      lastRestocked: Timestamp.fromDate(new Date('2023-02-01'))
    },
    {
      id: 'inv5',
      productId: 'prod5',
      quantityAvailable: 250,
      lowStockThreshold: 50,
      lastRestocked: Timestamp.fromDate(new Date('2023-02-15'))
    }
  ];

  for (const item of inventoryItems) {
    await addDocumentWithId('inventory', item.id, item);
  }
}

// Seed Shopping Carts
async function seedShoppingCarts() {
  const carts = [
    {
      id: 'cart1',
      userId: 'user1',
      sessionId: 'session123',
      items: [
        {
          productId: 'prod1',
          quantity: 2,
          addedAt: Timestamp.fromDate(new Date('2023-03-01'))
        },
        {
          productId: 'prod5',
          quantity: 1,
          addedAt: Timestamp.fromDate(new Date('2023-03-01'))
        }
      ],
      expiresAt: Timestamp.fromDate(new Date('2023-03-08'))
    },
    {
      id: 'cart2',
      userId: 'user2',
      sessionId: 'session456',
      items: [
        {
          productId: 'prod2',
          quantity: 1,
          addedAt: Timestamp.fromDate(new Date('2023-03-02'))
        }
      ],
      expiresAt: Timestamp.fromDate(new Date('2023-03-09'))
    },
    {
      id: 'cart3',
      sessionId: 'session789', // Guest cart (no userId)
      items: [
        {
          productId: 'prod3',
          quantity: 1,
          addedAt: Timestamp.fromDate(new Date('2023-03-03'))
        },
        {
          productId: 'prod4',
          quantity: 2,
          addedAt: Timestamp.fromDate(new Date('2023-03-03'))
        }
      ],
      expiresAt: Timestamp.fromDate(new Date('2023-03-10'))
    }
  ];

  for (const cart of carts) {
    await addDocumentWithId('shoppingCarts', cart.id, cart);
  }
}

// Seed Orders
async function seedOrders() {
  const orders = [
    {
      id: 'order1',
      orderNumber: 'ORD-2023-001',
      userId: 'user1',
      shippingAddress: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        postalCode: '12345',
        country: 'USA'
      },
      billingAddress: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        postalCode: '12345',
        country: 'USA'
      },
      subtotal: 153.97,
      shippingCost: 8.50,
      taxAmount: 13.20,
      totalPrice: 175.67,
      orderDate: Timestamp.fromDate(new Date('2023-02-28')),
      status: 'delivered',
      statusHistory: [
        {
          status: 'pending',
          timestamp: Timestamp.fromDate(new Date('2023-02-28')),
          note: 'Order placed'
        },
        {
          status: 'processing',
          timestamp: Timestamp.fromDate(new Date('2023-03-01')),
          note: 'Payment confirmed'
        },
        {
          status: 'shipped',
          timestamp: Timestamp.fromDate(new Date('2023-03-02')),
          note: 'Package shipped'
        },
        {
          status: 'delivered',
          timestamp: Timestamp.fromDate(new Date('2023-03-05')),
          note: 'Package delivered'
        }
      ],
      trackingNumber: 'TRK123456789',
      shippingCarrier: 'FedEx',
      estimatedDeliveryDate: Timestamp.fromDate(new Date('2023-03-05')),
      items: [
        {
          productId: 'prod1',
          productName: 'Mobil 1 Extended Performance Full Synthetic 5W-30',
          brandName: 'Mobil 1',
          quantity: 2,
          pricePerUnit: 52.99,
          subtotal: 105.98
        },
        {
          productId: 'prod5',
          productName: 'Pennzoil Platinum Full Synthetic 5W-20',
          brandName: 'Pennzoil',
          quantity: 1,
          pricePerUnit: 47.99,
          subtotal: 47.99
        }
      ],
      customerNotes: 'Please leave package at the front door',
      internalNotes: 'Customer is a regular buyer of automotive supplies'
    },
    {
      id: 'order2',
      orderNumber: 'ORD-2023-002',
      userId: 'user2',
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Somewhere',
        state: 'NY',
        postalCode: '67890',
        country: 'USA'
      },
      billingAddress: {
        street: '456 Oak Ave',
        city: 'Somewhere',
        state: 'NY',
        postalCode: '67890',
        country: 'USA'
      },
      subtotal: 89.99,
      shippingCost: 9.99,
      taxAmount: 8.00,
      totalPrice: 107.98,
      orderDate: Timestamp.fromDate(new Date('2023-03-01')),
      status: 'shipped',
      statusHistory: [
        {
          status: 'pending',
          timestamp: Timestamp.fromDate(new Date('2023-03-01')),
          note: 'Order placed'
        },
        {
          status: 'processing',
          timestamp: Timestamp.fromDate(new Date('2023-03-02')),
          note: 'Payment confirmed'
        },
        {
          status: 'shipped',
          timestamp: Timestamp.fromDate(new Date('2023-03-03')),
          note: 'Package shipped'
        }
      ],
      trackingNumber: 'TRK987654321',
      shippingCarrier: 'UPS',
      estimatedDeliveryDate: Timestamp.fromDate(new Date('2023-03-07')),
      items: [
        {
          productId: 'prod2',
          productName: 'Castrol EDGE Advanced Full Synthetic 0W-40',
          brandName: 'Castrol',
          quantity: 1,
          pricePerUnit: 89.99,
          subtotal: 89.99
        }
      ],
      customerNotes: 'Call before delivery',
      internalNotes: 'Customer runs a racing team'
    },
    {
      id: 'order3',
      orderNumber: 'ORD-2023-003',
      guestEmail: 'guest@example.com',
      guestName: 'Guest User',
      guestPhone: '555-111-2222',
      shippingAddress: {
        street: '789 Pine St',
        city: 'Elsewhere',
        state: 'TX',
        postalCode: '54321',
        country: 'USA'
      },
      billingAddress: {
        street: '789 Pine St',
        city: 'Elsewhere',
        state: 'TX',
        postalCode: '54321',
        country: 'USA'
      },
      subtotal: 119.97,
      shippingCost: 12.50,
      taxAmount: 9.90,
      totalPrice: 142.37,
      orderDate: Timestamp.fromDate(new Date('2023-03-05')),
      status: 'processing',
      statusHistory: [
        {
          status: 'pending',
          timestamp: Timestamp.fromDate(new Date('2023-03-05')),
          note: 'Order placed'
        },
        {
          status: 'processing',
          timestamp: Timestamp.fromDate(new Date('2023-03-06')),
          note: 'Payment confirmed'
        }
      ],
      trackingNumber: '',
      shippingCarrier: '',
      estimatedDeliveryDate: Timestamp.fromDate(new Date('2023-03-12')),
      items: [
        {
          productId: 'prod3',
          productName: 'Shell Rotella T6 Diesel Engine Oil 15W-40',
          brandName: 'Shell',
          quantity: 1,
          pricePerUnit: 45.99,
          subtotal: 45.99
        },
        {
          productId: 'prod4',
          productName: 'Valvoline High Mileage SAE 10W-30',
          brandName: 'Valvoline',
          quantity: 2,
          pricePerUnit: 36.99,
          subtotal: 73.98
        }
      ],
      customerNotes: 'For my truck and sedan',
      internalNotes: 'First-time guest customer'
    }
  ];

  for (const order of orders) {
    await addDocumentWithId('orders', order.id, order);
  }
}

// Seed Payments
async function seedPayments() {
  const payments = [
    {
      id: 'payment1',
      orderId: 'order1',
      userId: 'user1',
      transactionId: 'txn_123456789',
      amount: 175.67,
      currency: 'USD',
      paymentDate: Timestamp.fromDate(new Date('2023-02-28')),
      method: 'credit_card',
      status: 'completed',
      gatewayResponse: {
        success: true,
        authCode: 'AUTH123456',
        cardLast4: '4242'
      }
    },
    {
      id: 'payment2',
      orderId: 'order2',
      userId: 'user2',
      transactionId: 'txn_987654321',
      amount: 107.98,
      currency: 'USD',
      paymentDate: Timestamp.fromDate(new Date('2023-03-01')),
      method: 'paypal',
      status: 'completed',
      gatewayResponse: {
        success: true,
        paypalTransactionId: 'PP12345678'
      }
    },
    {
      id: 'payment3',
      orderId: 'order3',
      guestEmail: 'guest@example.com',
      transactionId: 'txn_456789123',
      amount: 142.37,
      currency: 'USD',
      paymentDate: Timestamp.fromDate(new Date('2023-03-05')),
      method: 'credit_card',
      status: 'completed',
      gatewayResponse: {
        success: true,
        authCode: 'AUTH789456',
        cardLast4: '1234'
      }
    }
  ];

  for (const payment of payments) {
    await addDocumentWithId('payments', payment.id, payment);
  }
}

// Check storage connectivity
async function checkStorageConnectivity() {
  try {
    // Try to list files to verify connectivity
    const [files] = await bucket.getFiles({ maxResults: 1 });
    console.log('Successfully connected to Firebase Storage');
    storageIsConnected = true;
    return true;
  } catch (error) {
    console.warn('Warning: Could not connect to Firebase Storage. Image verification will be skipped.');
    console.warn('Error details:', error.message);
    storageIsConnected = false;
    return false;
  }
}

// Main function to seed all data
async function seedAll() {
  try {
    console.log('Starting database seeding...');
    
    // Track progress
    const startTime = Date.now();
    
    // Check storage connectivity
    console.log('Checking Firebase Storage connectivity...');
    const storageConnected = await checkStorageConnectivity();
    
    // Seed in order of dependencies
    console.log('Step 1/8: Seeding users...');
    await seedUsers();
    
    console.log('Step 2/8: Seeding categories...');
    await seedCategories();
    
    console.log('Step 3/8: Seeding brands...');
    await seedBrands();
    
    console.log('Step 4/8: Seeding products...');
    await seedProducts();
    
    console.log('Step 5/8: Seeding inventory...');
    await seedInventory();
    
    console.log('Step 6/8: Seeding shopping carts...');
    await seedShoppingCarts();
    
    console.log('Step 7/8: Seeding orders...');
    await seedOrders();
    
    console.log('Step 8/8: Seeding payments...');
    await seedPayments();
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log(`Database seeding completed successfully in ${duration.toFixed(2)} seconds!`);
    console.log('Note: Images referenced in the data must be manually uploaded to Firebase Storage.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    console.error('Seeding process failed. Please check the error above.');
    process.exit(1);
  }
}

// Run the seed function
seedAll();

// Utility function to upload sample images to Firebase Storage
// This can be exported and run separately
export async function uploadSampleImages() {
  try {
    console.log('Starting sample image upload to Firebase Storage...');
    
    // Initialize Firebase Admin if not already initialized
    if (!storage) {
      initializeApp({
        credential: cert(serviceAccount),
        storageBucket: 'cpsc-449-project.firebasestorage.app'
      });
      
      const storage = getStorage();
      const bucket = storage.bucket();
    }
    
    // Sample directory where you have local test images
    const sampleImagesDir = './sample_images';
    
    // Example of uploading a sample brand logo
    // You would need to have these files locally before running this function
    
    console.log('Uploading brand logos...');
    await uploadFile(`${sampleImagesDir}/mobil1-logo.jpg`, 'brand_logos/mobil1-logo.jpg');
    await uploadFile(`${sampleImagesDir}/castrol-logo.jpg`, 'brand_logos/castrol-logo.jpg');
    await uploadFile(`${sampleImagesDir}/pennzoil-logo.jpg`, 'brand_logos/pennzoil-logo.jpg');
    await uploadFile(`${sampleImagesDir}/valvoline-logo.jpg`, 'brand_logos/valvoline-logo.jpg');
    await uploadFile(`${sampleImagesDir}/shell-logo.jpg`, 'brand_logos/shell-logo.jpg');
    
    console.log('Uploading product images...');
    await uploadFile(`${sampleImagesDir}/mobil1-5w30-1.jpg`, 'product_images/mobil1-5w30-1.jpg');
    await uploadFile(`${sampleImagesDir}/mobil1-5w-30-2.jpg`, 'product_images/mobil1-5w-30-2.jpg');
    await uploadFile(`${sampleImagesDir}/castrol-edge-0w40-1.jpg`, 'product_images/castrol-edge-0w40-1.jpg');
    await uploadFile(`${sampleImagesDir}/shell-rotella-15w40-1.jpg`, 'product_images/shell-rotella-15w40-1.jpg');
    await uploadFile(`${sampleImagesDir}/valvoline-high-mileage-10w30-1.jpg`, 'product_images/valvoline-high-mileage-10w30-1.jpg');
    await uploadFile(`${sampleImagesDir}/pennzoil-platinum-5w20-1.jpg`, 'product_images/pennzoil-platinum-5w20-1.jpg');
    
    console.log('Sample image upload completed successfully!');
  } catch (error) {
    console.error('Error uploading sample images:', error);
  }
}

// Helper function to upload a file to Firebase Storage
async function uploadFile(localFilePath, storagePath) {
  try {
    await bucket.upload(localFilePath, {
      destination: storagePath,
      metadata: {
        contentType: 'image/jpeg', // Adjust as needed for different file types
      }
    });
    console.log(`Uploaded ${localFilePath} to ${storagePath}`);
  } catch (error) {
    console.error(`Error uploading ${localFilePath}:`, error);
  }
} 