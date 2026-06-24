import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 });
    }

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'El archivo debe ser una imagen' }, { status: 400 });
    }

    // Leer los bytes del archivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Crear un nombre único para el archivo
    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

    // Directorio donde se guardarán las imágenes
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

    // Crear la carpeta si no existe
    await mkdir(uploadsDir, { recursive: true });

    // Guardar el archivo en disco
    const filePath = path.join(uploadsDir, fileName);
    await writeFile(filePath, buffer);

    // Retornar la URL pública
    const url = `/uploads/${fileName}`;
    return NextResponse.json({ url }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error al guardar imagen:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error interno al guardar la imagen' },
      { status: 500 }
    );
  }
}
