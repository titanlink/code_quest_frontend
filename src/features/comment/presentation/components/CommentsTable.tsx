import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import React from "react";
import { IComment } from "../../domain/entities/comment.entity";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomCard } from "@/components/CustomCard";

interface Props {
  totalRecords?: number;
  filteredComments: IComment[];
  handleDeleteComment: (commentId: string) => void;
}

export const CommentsTable = ({ filteredComments, totalRecords }: Props) => {
  return (
    <CustomCard>
      <CardHeader>
        <CardTitle>
          <div className="grid grid-cols-2">
            <div className="flex flex-row w-full">
              Filtrados ({filteredComments.length})
            </div>
            <div className="flex flex-row w-full  justify-end">
              {totalRecords && <>Total de Registros ({totalRecords}) </>}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComments.map((comment, indx) => (
              <TableRow key={comment.id}>
                <TableCell>{indx + 1}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium truncate w-120">
                      {comment.content}
                    </p>
                    {/* <p className="text-sm text-muted-foreground line-clamp-1">{comment.excerpt}</p> */}
                  </div>
                </TableCell>
                <TableCell>{comment?.author?.name}</TableCell>
                <TableCell>
                  {comment?.createdAt?.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </CustomCard>
  );
};
