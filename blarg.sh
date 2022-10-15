count=8
for i in $(seq $count); do
    nohup node jupjup.mjs &
done
tail -f nohup.out
