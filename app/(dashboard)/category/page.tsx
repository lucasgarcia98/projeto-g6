'use client';
import ListCustom, { IDataCustom } from '@/app/components/custom/list';
import { useEffect, useState } from 'react';

export default function CategoryPage() {
  const [dataList, setDataList] = useState<Array<IDataCustom>>([]);

  useEffect(() => {
    fetch('api/category')
      .then((res) => res.json())
      .then((data) => {
        if (data?.length > 0) {
          setDataList(
            data.map((item: { id: string; nome: string }) => ({
              id: item.id,
              name: item.nome,
            })),
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <ListCustom title="Categorias" titleDialog="Categoria" route="category" />
  );
}
