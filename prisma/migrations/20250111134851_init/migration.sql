-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
