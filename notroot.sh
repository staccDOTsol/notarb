while :
do
#while : 
#do :
nohup ts-node getmyluts.ts &
OUTPUT2=$(ps aux | grep -c "jupjupflash.mjs")

if (( OUTPUT2 > 7 )); then
    echo "python322 is running"
 
       sleep 5
else
    echo "python223 is not 
running"

    nohup node jupjupflash.mjs &

    nohup node jupjupflash.mjs &

    nohup node jupjupflash.mjs &      
#$
   nohup node jupjupflash.mjs &

    nohup node jupjupflash.mjs &

#    nohup node jupjupflash.mjs &

#    nohup node jupjupflash.mjs &

    nohup node jupjupflash.mjs &

    nohup node jupjupflash.mjs &        
    nohup node jupjupflash.mjs &

    nohup node jupjupflash.mjs &

    nohup node jupjupflash.mjs &
sleep 600
killall node
sleep 10
nohup ts-node getmyluts.ts &
fi

done

sleep 180
killall node
sleep 2
nohup ts-node getmyluts.ts &

#done
