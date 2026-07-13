// Helpers para el layout "bento": reparte N tarjetas en filas con distinta
// cantidad (ciclo 3 → 2 → 1) sobre un grid de 6 columnas.

// Devuelve la lista de tamaños de fila. Ej: 6 → [3,2,1]; 7 → [3,2,1,1]; 8 → [3,2,1,2].
export const planRows = (n) => {
    const rows = [];
    let rem = n;
    const seq = [3, 2, 1];
    let i = 0;
    while (rem > 0) {
        const r = Math.min(seq[i % seq.length], rem);
        rows.push(r);
        rem -= r;
        i++;
    }
    return rows;
};

// Expande el plan de filas a un span (sobre 6 columnas) + orientación por tarjeta.
// Las filas de 1 sola tarjeta son "horizontales" (featured: imagen al lado del texto).
export const buildLayout = (n) => {
    const layout = [];
    planRows(n).forEach((perRow) => {
        for (let j = 0; j < perRow; j++) {
            layout.push({ span: 6 / perRow, horizontal: perRow === 1 });
        }
    });
    return layout;
};
