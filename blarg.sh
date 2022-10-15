count=8
for i in $(seq $count); do
    sleep 1
    nohup node jupjup.mjs &
    sleep 1
    nohup node jupjupflash.mjs &
done
#tail -f nohup.out
